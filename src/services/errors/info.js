const infoError = (productTitle,productDesc,productPrice) => {
    return `Data is incomplete or not valid. These fields are required:
    - Title: needs to be String, data received ${productTitle}
    - Description: needs to be String, data received ${productDesc}
    - Price: needs to be String, data received ${productPrice}`
}

export default infoError