import "./Home.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [curationList, setCurationList] = useState([]);

  const getCuration = async () => {
    const response = await axios.get("/curation");
    const data = await response.data.curationPreviewDTOList;
    setCurationList(data);
  };

  useEffect(() => {
    getCuration();
  }, []);

  return (
    <div>
      <div className="head">큐레이션</div>
      <div className="list">
        {curationList.map((item, idx) => (
          <div
            className="item"
            key={idx}
            style={{
              backgroundImage: `url(${item.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
            }}
            onClick={() => {
              navigate("/detail?curationId=" + item.id);
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: "8px",
                alignItems: "center",
              }}
            >
              <div className="tag"># {item.tag}</div>
            </div>
            <div className="title">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
