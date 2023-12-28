import React from "react";
// import ReactMapGL from 'react-map-gl';


const Map: React.FC = () => {
  return (
    <section className="map">
        <div className="map-area w-full h-[320px]">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d463583.6636144819!2d-122.68367700000002!3d45.520558!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a03506b8051%3A0x86b277cdd2af928b!2sCENTRL%20Office%20Portland%20-%20West%20End!5e1!3m2!1sen!2sus!4v1701676253301!5m2!1sen!2sus" width="600" height="450"  className="w-full h-[320px]"></iframe>
        </div>

  </section>
  );
};

export default Map;
