import React from "react";

const Footer = (props) => {
  const { todo } = props;

  if (todo.length !== 0) return null;

  return (
    <>
      <span className="text">Одоогоор ажил алга. Нэгийг нэмнэ үү!</span>
      <span className="powered">
        Powered by{" "}
        <a
          style={{ textDecoration: "none" }}
          href="https://facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          ODKOSHKA
        </a>
      </span>
    </>
  );
};
export default Footer;
