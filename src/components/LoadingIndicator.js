import React from "react";
import loading from "./images/spinner.gif"


function LoadingIndicator() {


    return (
        <>
            <div>
                <img style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",

                }} src={loading} alt="loading" />
            </div>
        </>
    )
}


export default LoadingIndicator;

