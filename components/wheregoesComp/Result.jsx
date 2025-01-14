const Result = ({ data }) => {
    if (!data) return null;
    
    return (
      <div className="result-container">
        <div className="p-[20px] text-left font-semibold rounded-[5px] relative imageWrap group overflow-hidden  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[4px] before:z-10 before:border-solid before:rounded-[5px]">
            <h3 className="text_gradient ">Redirect Information</h3>
        </div>
        <div className="mt-[30px]">
        <table className="table-auto w-full border-separate ">
            <tbody> 
                <tr className="odd:bg-[#8000ff1a]">
                  <th className="p-3 min-w-[130px] text-left text-lg font-medium text-gray-700"><p className="text-black">Report Time:</p></th>
                  <td className="text-gray-600 pl-[10px]"><p className="text-black">{data?.date}</p></td>
                </tr>
                <tr className="odd:bg-[#8000ff1a]">
                  <th className="p-3 min-w-[130px] text-left text-lg font-medium text-gray-700"><p className="text-black">URL:</p></th>
                  <td className="text-gray-600 pl-[10px]">
                  <p><a
                      href={data.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8000FF] hover:underline "
                    >
                      {data.originalUrl}
                    </a></p>
                  </td>
                </tr>
                <tr className="odd:bg-[#8000ff1a]">
                  <th className="p-3 min-w-[130px] text-left text-lg font-medium text-gray-700"><p className="text-black">Redirecting to:</p></th>
                  <td className="text-gray-600 pl-[10px]">
                  <p><a
                      href={data.finalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8000FF] hover:underline "
                    >
                      {data.finalUrl}
                    </a></p>
                  </td>
                </tr>
                <tr className="odd:bg-[#8000ff1a]">
                  <th className="p-3 min-w-[130px] text-left text-lg font-medium text-gray-700"><p className="text-black">Redirect Type:</p></th>
                  <td className="text-gray-600 pl-[10px]"><p className="text-green-600">{data?.type}</p></td>
                </tr>
            </tbody>   
        </table>
        </div>
        
      </div>
    );
  };
  
  export default Result;
  