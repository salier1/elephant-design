import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/Button";

function App() {
  return (
    <div className="App">
      <Button size={ButtonSize.Small} disabled>
        small
      </Button>

      <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>
        haha
      </Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Danger} href="https://www.google.com.hk/">
        haha
      </Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Default} href="https://www.google.com.hk/">
        haha
      </Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Link} href="https://www.google.com.hk/">
        haha
      </Button>
    </div>
  );
}

export default App;
