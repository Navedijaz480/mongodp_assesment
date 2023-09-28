const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const app = express();

const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const ethUtil = require("ethereumjs-util");
const ethereum_address = require("ethereum-address");

const web3 = new Web3("https://rpc.notadegen.com/eth/goerli");

const contractAddress = "0xa8760C325b1A1f05711ef5c4638196d740087780"; // Deployed manually
const abi = [
  {
    inputs: [{ internalType: "string", name: "DeviceName", type: "string" }],
    name: "GetDevicEKD3",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "DeviceName", type: "string" }],
    name: "GetDeviceHDD1",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "DeviceName", type: "string" },
      { internalType: "string", name: "HDD1", type: "string" },
      { internalType: "string", name: "EKD3", type: "string" },
    ],
    name: "RegisterDevice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://Naved:Navedijaz@nodefirstapi.u9ydq5a.mongodb.net/Node_API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongooDb");
    app.listen(3000, () => {
      console.log(" node api is running on port 3000");
    });
  })
  .catch(() => {
    console.log("error in connection");
  });

let DeviceName;
let DeviceId;
let NextApiResponse;


async function checkDeviceExistance(DeviceName1) {
  contract = await new web3.eth.Contract(abi, contractAddress);
  try {
    let _GetDeviceHDD1 = await contract.methods
      .GetDeviceHDD1(DeviceName1)
      .call();
    return _GetDeviceHDD1;
  } catch (error) {
    console.log(error);
  }
}

function getRandomNumberFromUUID() {
  const uuid = uuidv4(); // Generate a random UUID
  const uuidArray = uuid.split("-"); // Split the UUID into parts
  const hexPart = uuidArray[0]; // Take one of the parts (adjust as needed)

  // Convert the hexadecimal part to a decimal number
  const randomNumber = parseInt(hexPart, 16);

  return randomNumber;
}

const randomNum = getRandomNumberFromUUID();

console.log("Random Number:", randomNum);

app.post("/random-number", async (req, res) => {
  let DeviceName1 = req.body.DeviceName;
  DeviceName=DeviceName1;
  let dName = await checkDeviceExistance(DeviceName);
  if (dName == "Not Found") {
    const randomNum = await getRandomNumberFromUUID();
    const postData = {
      uuid: "randomNum",
    };
    try {
      res.json({ randomNum: randomNum });
      const response = await axios.post(
        "http://192.168.18.85:3000/blockchain-iot/DeviceRegister",
        postData
      );

      // Handle the response from the next API as needed
      const nextApiResponse = response.data;
      NextApiResponse = nextApiResponse;
      // Send the response from the next API back to the client
    } catch (error) {
      console.error("Error sending request to next API:", error);
      res.status(500).json({ error: "Failed to send request to next API" });
    }

    const postdata2 = {
      DeviceName: DeviceName,
      DeviceId: DeviceId,
      NextApiResponse: NextApiResponse,
    };
    
    RegisterDevice(postdata2);
  } else {
    res.send({ success: true, msg: "you are already registered" });
  }
});

app.post("/GetDeviceHDD1", async function (request, response) {
  DeviceName = request.body.DeviceName;
  DeviceId = request.body.DeviceId;
  let dName = await checkDeviceExistance(DeviceName);
  try {
    if (dName != "Not Found") {
      response.send({ success: true, DeviceStatus: "Found" });
    } else {
      response.send({ success: false, DeviceStatus: dName });
    }
  } catch (error) {
    console.log(error);
  }
});



app.post("/GetDevicEKD3", async function (request, response) {
  DeviceName = request.body.DeviceName;
  DeviceId = request.body.DeviceId;
  const contract = await new web3.eth.Contract(abi, contractAddress);

  try {
    let _GetDevicEKD3 = await contract.methods.GetDevicEKD3(DeviceName).call();
    response.send({ success: true, _GetDevicEKD3: _GetDevicEKD3 });
    DeviceIdLB = _GetDevicEKD3;
  } catch (error) {
    console.log(error);
  }
});
async function RegisterDevice() {
  let fromAddress = "0xcb06C621e1DCf9D5BB67Af79BEa90Ac626e4Ff38";
  let privateKey =
    "2817782db86070d764c41b898d0564c791747c8e35961b3bcb655565a804907b";

  try {
    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }
    let bufferedKey = ethUtil.toBuffer(privateKey);
    console.log("xxx");
    if (
      ethereum_address.isAddress(fromAddress) &&
      ethereum_address.isAddress(fromAddress) &&
      ethUtil.isValidPrivate(bufferedKey)
    ) {
      
      const contract = await new web3.eth.Contract(abi, contractAddress);
      let count;
     
      const tx_builder = await contract.methods.RegisterDevice(
        DeviceName,
        DeviceId,
        NextApiResponse
      );

      let encoded_tx = tx_builder.encodeABI();

      let gasPrice = await web3.eth.getGasPrice();
      let transactionObject = {
        nonce: web3.utils.toHex(count),
        from: fromAddress,
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(232276),
        to: contractAddress,
        data: encoded_tx,
        chainId: 5,
      };

      web3.eth.accounts
        .signTransaction(transactionObject, privateKey)
        .then((signedTx) => {
          web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            async function (err, hash) {
              if (!err) {
                console.log("hash is : ", hash);
              } else {
              }
            }
          );
        });
    }
  } catch (e) {}
}
