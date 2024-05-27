const admin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "car-hub-130b6",
  private_key_id: "c61ca1b87d739ef8d3dd1f6ec510a74da1748c7a",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCo9VnHcQdc/DcW\nI9DMxo8za9MKaGTB2BMHWyLqriK2LPkL5bI02u+i+ZCrREpCvVT5t2ajh0dnxLsU\n3tm/aIf5tF2Pr2cE0X559Dq4h+RPCyvB936Z/V16uOBg/Jzb8T7bTGPXq9UrYm1R\nAf1P6zkSCINhJq7bTwfZsUQn56PvPwkRhm7Oll0iaQ1msKYGgsuetCyMd+MFYGx2\nXWCLRhxUJLmOfSDFb4XRvfh8XAFBPa/WtHe7bx56e6Boo8P0N1jBlwFQfUdhA6fv\ns+FogWzgQW/gL4vT8Bvs9Ushyvz72TJZetdIrxCHEPTlAb/MEQYw5VUS71IERQx4\nbOCM6X4tAgMBAAECggEABQF/73VdRem3qmOwsbvru2AAvUYzrOF0Sk3KF558mMt1\ndYOi+b3r/fcAFbeDrgaHKpEsfwmNUJ3AH4Pj6NR1vAg63Wpj1mr+jpeV2BZcV5sw\njUamyHShRhvWbpt7IR/ziWBfvg5e+ns6Ww+AmdNIlZXosycH9zm8x4U8cNtfhcFa\nyoAFFzHwCql1aG9afd+xLbw+47R2EWAbWK1jyOQswmEN6k9zkLm9gQfszYn1j3bB\nLwO3MI+ehENIiqGRyuf49ZQj7QBoJBv9VvFM0x/45gpuy7YAvUBE/oNmA9PWXnLI\nMAjuIkrwnFFzHGVey9WfSWEd/mBYn5jwL+/pm6PEAQKBgQDsIJHQygdnDrDH/wlU\nt7EnBKqv6Q8mAFPRJs4KeGpezuHzyOHdpciPJDO1rJqO4ObvTyQ2LSbn7UfDefXb\nECf77V9yMbmzjmdTtjrr438Sg3GTvb0+FuiK+66ISjfhqhlJsft+dCUWqGkQb8E2\n0bMDOkSJ8bp9qeKmXjm9HTJ9zQKBgQC3LZvsLANiaPSu7i7XoAwUcRdXlAzkobFG\n1A75VSlY6Is1lSJl6Bs322IqSML/OOU0/ts6g0n9/OsOLWJKFw6zyoEKrOI9ff0F\n8B8caduM81nYT56eX6Cowl03t/1Yfn/meYtXWb8VZAjaWGjMBWMGQl2GCSqQjlAL\nbh0WKReh4QKBgBU0/6Oe4XdSDHKJ506iiNiWRLYz2lZxZRW9xHeQRQ1qy0RX4GFF\nyHOCrto8PE1kyZjopLnw6DOgTfeydnBMTSsFMLNS3/jOa11LWpNhBUKmZ4b7XYm8\nCPqijBRVhhtQaaECyTGcQNB+I6GER/gicU9y5kD1YuhyX5bNk6X2f1hpAoGALlMs\ngZfH61Vbu/mkgweIxoqrOozIjfGOYbkzaD7vS/rTaeOjZV5Ds+aZdtQb7Gu5G6Pw\nUWXuinsx/s3fc5lNMI7f/5ElTiPUn3HQjGEBEy5f5GKOXMMWYFd3N6YiPgUP13uZ\nj6e0uXYo/v8o0Z/zIRwbhtA+oXw8Jgfc90PBJEECgYEAwy+r3DqJKXFr3blBRYyW\nNUHgNz5VuvsgPPGTQUG3ui9Pqtd4vrJgZLn5s1E4EXYkk2cBz0KxULCMajAYnHr1\nOLXAJx3tqez+zXt+Fhkd3oS0M+EBzFfLbOTUa4i5sYCB8csro25IiadFig5xUeay\nnH/dtP/gwuIc2mf+FK6gFSM=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-8i2zj@car-hub-130b6.iam.gserviceaccount.com",
  client_id: "116197795630240031318",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8i2zj%40car-hub-130b6.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// Initialize Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://car-hub-130b6-default-rtdb.europe-west1.firebasedatabase.app",
  });
}

module.exports = admin;
