import React from "react";
import Grade from "./Grade";
import Advance from "./Advance";

export default function Summary({site, headers}) {
  let headersData = headers
    

  if (!headersData) return <div>Loading...</div>;

  return (
    <div className="push-top mt-[50px] border-1 border-black">
      <div className="p-[20px] text-left font-semibold rounded-[5px] relative imageWrap group overflow-hidden  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[4px] before:z-10 before:border-solid before:rounded-[5px]">
        <h2 className="text_gradient ">Security Report Summary</h2>
      </div>
      <div className=" pt-[10px]">
        <div className="flex flex-wrap">
      
          <div className="w-[20%] sm:w-1/4 p-4">
            <div className="score">
                <Grade headers={headersData?.evaluation}/>
            </div>
          </div>

        
          <div className="w-[80%] sm:w-3/4 p-4">
            <table className="table-auto w-full border-separate border-spacing-4">
              <tbody>
                <tr>
                  <th className="text-left text-lg font-medium text-gray-700">Site:</th>
                  <td>
                    <a
                      href={site}
                      target="_blank"
                      rel="nofollow noreferrer noopener"
                      className="text-blue-600 hover:underline"
                    >
                      {site}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th className="text-left text-lg font-medium text-gray-700">IP Address:</th>
                  <td className="text-gray-600">{headersData?.ip}</td>
                </tr>
                <tr>
                  <th className="text-left text-lg font-medium text-gray-700">Report Time:</th>
                  <td className="text-gray-600">{headersData?.headers?.date}</td>
                </tr>
                <tr>
                  <th className="text-left text-lg font-medium text-gray-700">Headers:</th>
                  <td>
                    <ul className="space-y-2">
                      {Object.entries(headersData?.evaluation)?.map(([header, status]) => (
                        <li
                          key={header}
                          className={`inline-block mr-[20px] space-x-2 `}
                        >
                          <i
                            className={`fa ${
                              status === "Present"
                                ? "fa-check-circle"
                                : status === "Missing"
                                ? "fa-times-circle"
                                : "fa-question-circle"
                            }`}
                          />
                          <span className={`${
                            status === "Present"
                              ? "!text-green-600"
                              : status === "Missing"
                              ? "!text-red-600"
                              : "!text-[#ffa500]"
                          }`}>{header}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th className="text-left text-lg font-medium text-gray-700">Advanced:</th>
                  <td>
                    <Advance headers={headersData?.evaluation}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
