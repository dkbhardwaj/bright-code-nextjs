import { checkLinksOnPage } from "../../utils/linkChecker";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.setHeader("Allow", ["POST"]).status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const { url, options = {} } = req.body;

    // Validate URL
    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ message: "Invalid URL provided" });
    }

    // Set SSE headers
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const sendEvent = (data) => {
      try {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      } catch (e) {
        console.error("Error writing to stream:", e);
      }
    };

    // Detect client disconnection
    let isClientConnected = true;
    res.on("close", () => {
      isClientConnected = false;
      console.log("Client disconnected, stopping crawl");
    });

    const timeout = setTimeout(() => {
      if (isClientConnected) {
        sendEvent({
          error: "Processing timed out",
          stats: { pagesVisited: 0, linksChecked: 0, brokenLinks: 0 },
        });
        res.end();
      }
    }, 300000);

    // Pass cancellation check to checkLinksOnPage
    await checkLinksOnPage(url, options, sendEvent, () => isClientConnected);

    clearTimeout(timeout);
    if (isClientConnected) {
      res.end();
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.write(
      `data: ${JSON.stringify({
        error: error.message,
        stats: { pagesVisited: 0, linksChecked: 0, brokenLinks: 0 },
      })}\n\n`
    );
    res.end();
  }
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
