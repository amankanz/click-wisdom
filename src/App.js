import { useState } from "react";
import "./App.css";

const message = 'Press "Get advice" to be advised...🌟';

export default function App() {
  return (
    <>
      <Main />
    </>
  );
}

function Main() {
  return (
    <main id="container">
      <h2>Advise Me 👴🏽</h2>
      <AdviceContainer />
      <Logo />
    </main>
  );
}

function AdviceContainer() {
  const [loader, setLoader] = useState(false);
  const [loadedAdvice, setLoadedAdvice] = useState(message);

  function loading() {
    setLoader(true);
    setLoadedAdvice(false);
  }

  function completeLoading() {
    setLoader(false);
  }

  async function handleGetAdvice() {
    loading();
    try {
      const response = await fetch("https://api.adviceslip.com/advice", {
        header: {
          Accept: "application/json",
        },
      });

      const adviceData = await response.json();

      setLoadedAdvice(adviceData.slip.advice);
      completeLoading();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <section className="advice-container">
      <Advice message={loadedAdvice} />

      <div
        className="loader"
        style={loader ? { display: "block" } : { display: "none" }}
      ></div>

      <button id="loadAdviceBtn" onClick={handleGetAdvice}>
        Get Advice
      </button>
    </section>
  );
}

function Advice({ message }) {
  return (
    <div className="advice">
      <i className="fa-sharp fa-solid fa-quote-left"></i>

      <p
        id="loadingAdvice"
        style={message ? { display: "block" } : { display: "none" }}
      >
        {message}
      </p>
    </div>
  );
}

function Logo() {
  return <img src="/1.png" alt="ClickWisdom logo" id="adviseMeImg" />;
}
