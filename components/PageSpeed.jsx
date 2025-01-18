import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function PageSpeed({result}) {


    function barColor(value){
        if(value > 79){
            return '#4caf50'
        }else if( value <= 79 && value > 50  ){
            return '#ffaa33'
        }else{
            return '#f44336'
        }
    }

  return (
    <section className="py-[60px]">
      <div className="container">
        {result && (
          <div className="result text-center">
            <h2>Analysis Results</h2>

            <div className="scores flex flex-wrap justify-center">
              <div className="score-card text-center w-full max-w-[200px] mr-[20px]">
                <h5>Performance</h5>
                <div className="w-full max-w-[100px] mx-auto">
                    <CircularProgressbar
                    value={result.performance}
                    text={`${result.performance}%`}
                    styles={buildStyles({
                        pathColor: barColor(result.performance),
                        textColor: barColor(result.performance),
                        trailColor: "#d6d6d6",
                    })}
                    />
                </div>
              </div>
              <div className="score-card text-center w-full max-w-[200px] mr-[20px]">
                <h5>Accessibility</h5>
                <div className="w-full max-w-[100px] mx-auto">
                    <CircularProgressbar
                    value={result.accessibility}
                    text={`${result.accessibility}%`}
                    styles={buildStyles({
                        pathColor: barColor(result.accessibility),
                        textColor: barColor(result.accessibility),
                        trailColor: "#d6d6d6",
                    })}
                    />
                </div>
                
              </div>
              <div className="score-card text-center w-full max-w-[200px]">
                <h5>SEO</h5>
                <div className="w-full max-w-[100px] mx-auto">
                    {console.log(result.seo)}
                <CircularProgressbar
                  value={result.seo}
                  text={`${result.seo}%`}
                  styles={buildStyles({
                    pathColor: barColor(result.seo),
                    textColor: barColor(result.seo),
                    trailColor: "#d6d6d6",
                  })}
                />
                </div>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
