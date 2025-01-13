import React from "react";
import Grade from "./Grade";
import Advance from "./Advance";

export default function Summary({site, headers, error}) {
  let headersData = headers
    

  if (!headersData) return <div>Loading...</div>;

  return (
    <section className="relative pt-[40px] pb-[60px]">
      <div className="mt-[20px">
        <div className="container">
          {error && <p>{error}</p>}
    <div className="push-top mt-[50px] border-1 border-black">
      <div className="p-[20px] text-left font-semibold rounded-[5px] relative imageWrap group overflow-hidden  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[4px] before:z-10 before:border-solid before:rounded-[5px]">
        <h3 className="text_gradient ">Security Report Summary</h3>
      </div>
      <div className=" pt-[10px]">
        <div className="flex flex-wrap">
      
          <div className="w-[17%] lg:w-full sm:w-1/4 p-4">
            <div className="score">
                <Grade headers={headersData?.evaluation}/>
            </div>
          </div>

        
          <div className="w-[83%] lg:w-full py-4">
            <table className="table-auto w-full border-separate ">
              <tbody>
                <tr className="odd:bg-[#8000ff1a]">
                  <th className="p-3 min-w-[130px] text-left text-lg font-medium text-gray-700"><p className="text-black">Site:</p></th>
                  <td className="text-gray-600 pl-[10px]">
                  <p><a
                      href={site}
                      target="_blank"
                      rel="nofollow noreferrer noopener"
                      className="text-[#8000FF] hover:underline "
                    >
                      {site}
                      
                    </a></p>
                  </td>
                </tr>
                <tr className="odd:bg-[#8000ff1a]">
                  <th className="p-3 min-w-[130px] text-left text-lg font-medium text-gray-700"><p className="text-black" >IP Address:</p></th>
                  <td className="text-gray-600 pl-[10px]"><p className="text-black">{headersData?.ip}</p></td>
                </tr>
                <tr className="odd:bg-[#8000ff1a]">
                  <th className="p-3 min-w-[130px] text-left text-lg font-medium text-gray-700"><p className="text-black">Report Time:</p></th>
                  <td className="text-gray-600 pl-[10px]"><p className="text-black">{headersData?.headers?.date}</p></td>
                </tr>
                <tr className="odd:bg-[#8000ff1a]">
                  <th className="p-3 min-w-[130px] text-left text-lg font-medium text-gray-700"><p className="text-black">Headers:</p></th>
                  <td className="pl-[10px]">
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
                <tr className="odd:bg-[#8000ff1a]">
                  <th className="p-3 min-w-[130px] text-left text-lg font-medium text-gray-700"><p className="text-black">Advanced:</p></th>
                  <td className="pl-[10px]">
                    <Advance headers={headersData?.evaluation}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
      </div>
    </section>
  );
}
