import { createOrder } from "./FetchApi";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchbrainTree = async (getBrainTreeToken, setState) => {
  try {
    let responseData = await getBrainTreeToken();
    if (responseData) {
      setState({
        clientToken: responseData.clientToken,
        success: responseData.success,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const pay = async (
  // data,
  dispatch,
  state,
  setState,
  // getPaymentProcess,
  totalCost,
  history
) => {
  console.log(state);
  if (!state.address) {
    setState({ ...state, error: "Please provide your address" });
  }
  else if (!state.phone) {
    setState({ ...state, error: "Please provide your phone number" });
  } else {
    // let nonce;
    // state.address.then((data) => {
        // dispatch({ type: "loading", payload: true });
        // nonce = data.nonce;
        // let paymentData = {
        //   amountTotal: totalCost(),
        //   paymentMethod: "paytm",
        // };

        let orderData = {
          allProduct: JSON.parse(localStorage.getItem("cart")),
          user: JSON.parse(localStorage.getItem("jwt")).user._id,
          address: state.address,
          phone: state.phone,
          amount: totalCost(),
        };
        console.log(orderData);
        try {
          let resposeData = await createOrder(orderData);
          console.log("!!", orderData);
          if (resposeData.success) {
            localStorage.setItem("cart", JSON.stringify([]));
            dispatch({ type: "cartProduct", payload: null });
            dispatch({ type: "cartTotalCost", payload: null });
            dispatch({ type: "orderSuccess", payload: true });
            setState({ clientToken: ""});
            dispatch({ type: "loading", payload: false });
            return history.push("/");
          } else if (resposeData.error) {
            console.log(resposeData.error);
          }
        } catch (error) {
          console.log(error);
        }
      // })
      // .catch((error) => {
      //   console.log(error);
      //   setState({ ...state, error: error.message });
      // });
  }
};
