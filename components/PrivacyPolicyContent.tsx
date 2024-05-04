import React from "react";

interface textContentData {
  data: {
    details: {
      id: number;
      title: string;
      content: string;
    }[];
  };
}

const PrivacyPolicyContent: React.FC<textContentData> = ({ data }) => {
  return (
    <>
      <section className="page_content padding-medium">
        <div className="container">
          {data?.details.map((text) => (
            <div
              className="content w-full mb-7 last:mb-0 md:mb-5 "
              key={text.id}
            >
              {text.title && (
                <h4 className="mb-5 md:mb-4 ">
                  <b>{text.title}</b>
                </h4>
              )}
              {text.content && (
                <h5 dangerouslySetInnerHTML={{ __html: text.content }} />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default PrivacyPolicyContent;
