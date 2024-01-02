import { useRecoilValue } from "recoil";
import "./DetailPage.css";

import React, { useEffect, useState } from "react";
import { currentCurationAtom } from "../../store/atom";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import BackButton from "../icon/BackButton";

function DetailPage() {
  const navigate = useNavigate();
  const currentCuration = useRecoilValue(currentCurationAtom);

  const [markdown, setMarkdown] = useState(``);

  useEffect(() => {
    if (!navigate) return;
    if (!currentCuration.mdUrl) {
      navigate("/");
    }
    fetch(currentCuration.mdUrl)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, [currentCuration, navigate]);

  return (
    <div className="detail">
      <div className="detail-head">
        <div className="back-button" onClick={() => navigate("/")}>
          <BackButton />
        </div>
        <div className="head-title">상세글보기</div>
      </div>
      <div
        className="cover"
        style={{
          backgroundImage: `url(${currentCuration.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <div className="cover-title">{currentCuration.title}</div>
        <div className="cover-date">
          {new Date(currentCuration.createdOn).getFullYear()}.
          {new Date(currentCuration.createdOn).getMonth() + 1}.
          {new Date(currentCuration.createdOn).getDate()}
        </div>
      </div>
      <div className="markdown">
        <MDEditor.Markdown
          source={markdown}
          style={{
            backgroundColor: "white",
            color: "black",
          }}
          rehypeRewrite={(node) => {
            if (node.tagName === "h1") {
              node.properties.style =
                "font-size: 28px; font-weight: 700; border-bottom: none";
            }
            if (node.tagName === "h2") {
              node.properties.style =
                "font-size: 20px; font-weight: 700; border-bottom: none";
            }
            if (node.tagName === "h3") {
              node.properties.style =
                "font-size: 16px; font-weight: 700; border-bottom: none";
            }
            if (
              node.type === "text" &&
              typeof node.value === "string" &&
              node.value.includes("&&")
            ) {
              node.properties.style = "font-size: 12px; color: #858585";
            }
          }}
        />
      </div>
    </div>
  );
}

export default DetailPage;
