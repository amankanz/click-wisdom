import { useState } from "react";
import "./App.css";

const initialTip = 'Press "Get advice" to be advised...🌟';

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
      <Heading />
      <AdviceContainer />
      <Logo />
    </main>
  );
}

function Heading() {
  return <h2>Advise Me 👴🏽</h2>;
}

function Logo() {
  return <img src="/1.png" alt="ClickWisdom logo" id="adviseMeImg" />;
}

function AdviceContainer() {
  const [loader, setLoader] = useState(false);
  const [loadedAdvice, setLoadedAdvice] = useState(initialTip);

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
      <Advice initialTip={loadedAdvice} />
      <Loader loader={loader} />
      <Button onGetAdvice={handleGetAdvice} />
    </section>
  );
}

function Advice({ initialTip }) {
  return (
    <div className="advice">
      <FontAwesome />
      <LoadingAdvice>{initialTip}</LoadingAdvice>
    </div>
  );
}

function FontAwesome() {
  return <i className="fa-sharp fa-solid fa-quote-left"></i>;
}

function LoadingAdvice({ children }) {
  return (
    <p
      id="loadingAdvice"
      style={children ? { display: "block" } : { display: "none" }}
    >
      {children}
    </p>
  );
}

function Loader({ loader }) {
  return (
    <div
      className="loader"
      style={loader ? { display: "block" } : { display: "none" }}
    ></div>
  );
}

function Button({ onGetAdvice }) {
  return (
    <button id="loadAdviceBtn" onClick={onGetAdvice}>
      Get Advice
    </button>
  );
}
