async function getId() {
  try {
    const response = await fetch("http://172.23.4.80:3500/data");
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data = await response.json();
    const lastimg = data.slice(-5);
    const ids = lastimg.map((lastimg) => lastimg._id);
    const detectionsData = lastimg.map((item) => {
      const detections = item.detections.map((detection) => ({
        box: detection.box,
        confidence: detection.confidence,
        label_name: detection.label_name,
        tracking_id: detection.tracking_id,
      }));

      return detections;
    });
    console.log("detectionsData:", detectionsData);

    const publicFolderPath = "http://172.23.4.80/share/predict_output/";

    const slides = ids.map((id, index) => ({
      url: `${publicFolderPath}${id}`,
      title: `Image ${index + 1}`,
      detections: detectionsData[index],
    }));

    return slides;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function websocketRequest(data = {}) {
  // Preparing the connection
  const dictResponse = {};

  return new Promise((resolve, reject) => {
    try {
      const url = "ws://172.23.4.80:8766";
      const ws = new WebSocket(url);

      ws.onopen = () => {
        if (Object.keys(data).length === 0) {
          // Send HANDSHAKE data
          const sendData = JSON.stringify({
            sender: "FRONTEND",
            to: "DRONE",
            data: "HANDSHAKE",
          });
          console.log(`Sending HANDSHAKE data via the websocket: ${sendData}`);
          ws.send(sendData);

          // Close the connection
          console.log("Closing the websocket connection");
          ws.close();
          resolve(dictResponse);
        } else {
          // Send data to websocket and wait for feedback
          const sendData = JSON.stringify(data);
          console.log(`Sending data via the websocket: ${sendData}`);
          ws.send(sendData);

          // Waiting for feedback
          console.log("Waiting for a response...");
          ws.on("message", (strResponse) => {
            console.log(`Received data via websocket: '${strResponse}'`);

            // Close the connection
            console.log("Closing the websocket connection");
            ws.close();

            // Transform JSON string to dictionary
            try {
              const jsonResponse = JSON.parse(strResponse);
              resolve(jsonResponse);
            } catch (e) {
              // If error, return an empty dictionary
              resolve(dictResponse);
            }
          });
        }
      };

      ws.onerror = (error) => {
        console.error(`An error has occurred: ${error}`);
        ws.close();
        resolve(dictResponse);
      };
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
      resolve(dictResponse);
    }
  });
}

function droneGetCoordinates() {
  // Prepare WebSocket connection
  const url = "ws://172.23.4.80:8766";
  const dictData = {
    sender: "FRONTEND",
    to: "DRONE",
    type: "get",
    method: "getCoordinates",
  };

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      // Send request to get drone coordinates
      const sendData = JSON.stringify(dictData);
      console.log(`Sending data via the websocket: ${sendData}`);
      ws.send(sendData);

      // Waiting for feedback
      console.log("Waiting for a response...");
    };

    ws.onmessage = (event) => {
      console.log(`Received data via websocket: '${event.data}'`);

      // Close the connection
      console.log("Closing the websocket connection");
      ws.close();

      // Transform JSON string to JavaScript object
      try {
        const dictResponse = JSON.parse(event.data);
        console.log("Received data:", dictResponse);

        // Test data for debugging purposes
        if (
          dictResponse.sender === "DRONE" &&
          dictResponse.status === "success" &&
          Object.keys(dictResponse.data).length === 5
        ) {
          // If the response is in the correct format, resolve the promise with the data
          resolve(dictResponse.data);
        } else {
          console.error(
            "Received drone coordinates have an unexpected format:",
            dictResponse
          );
          resolve({});
        }
      } catch (error) {
        console.error("An error has occurred:", error);
        resolve({});
      }
    };

    ws.onerror = (error) => {
      console.error("An error has occurred:", error);
      ws.close();
      resolve({});
    };
  });
}

export { getId, websocketRequest, droneGetCoordinates };
