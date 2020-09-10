<template>
  <div>
    <button class="bn btn-sm btn-success" @click="abrirModal()">Pagar</button>
    <CModal
      title="Pagar servicio"
      color="primary"
      :show.sync="activarModal"
      :footer="false"
    >
      <div class="container-fluid " v-if="activarModal">
        <div id="form-container d-inline">
          <div id="sq-card-number"></div>
          <div class="third" id="sq-expiration-date"></div>
          <div class="third" id="sq-cvv"></div>
          <div class="third" id="sq-postal-code"></div>
        </div>
      </div>
      <input :value="monto" disabled hidden id="montotal" />

      <template #footer>
        <button
          id="sq-creditcard"
          class="button-credit-card"
          @click="onGetCardNonce($event)"
        >
          S/. {{ monto }} soles
        </button>
      </template>
    </CModal>
  </div>
</template>

<script>
// Create and initialize a payment form object
const paymentForm = new SqPaymentForm({
  // Initialize the payment form elements

  //TODO: Replace with your sandbox application ID
  applicationId: "sandbox-sq0idb-oSuL51t6b3vM3mBO5sqYgg",
  inputClass: "sq-input",
  autoBuild: false,
  // Customize the CSS for SqPaymentForm iframe elements
  inputStyles: [
    {
      fontSize: "16px",
      lineHeight: "24px",
      padding: "16px",
      placeholderColor: "#a0a0a0",
      backgroundColor: "transparent",
    },
  ],
  // Initialize the credit card placeholders
  cardNumber: {
    elementId: "sq-card-number",
    placeholder: "Card Number",
  },
  cvv: {
    elementId: "sq-cvv",
    placeholder: "CVV",
  },
  expirationDate: {
    elementId: "sq-expiration-date",
    placeholder: "MM/YY",
  },
  postalCode: {
    elementId: "sq-postal-code",
    placeholder: "Postal",
  },
  // SqPaymentForm callback functions
  callbacks: {
    /*
     * callback function: cardNonceResponseReceived
     * Triggered when: SqPaymentForm completes a card nonce request
     */
    cardNonceResponseReceived: function(errors, nonce, cardData) {
      if (errors) {
        // Log errors from nonce generation to the browser developer console.
        console.error("Encountered errors:");
        errors.forEach(function(error) {
          console.error("  " + error.message);
        });
        alert(
          "Encountered errors, check browser developer console for more details"
        );
        return;
      }
      let monto = document.getElementById("montotal").value;
      //TODO: Replace alert with code in step 2.1
      // alert(`The generated nonce is:\n${nonce}`);
      fetch("http://localhost:4000/pagos/pagarServicio", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nonce: nonce,
          monto: monto,
        }),
      })
        .catch((err) => {
          alert("Network error: " + err);
        })
        .then((response) => {
          if (!response.ok) {
            return response
              .text()
              .then((errorInfo) => Promise.reject(errorInfo));
          }
          return response.text();
        })
        .then((data) => {
          console.log(JSON.stringify(data));
          localStorage.removeItem("listCarrito");
          this.$router.push(
            "/reservacion",
            () => {},
            () => {}
          );
          this.$global
            .appSuccess({ mensaje: "se realizó el pago correctamente" })
            .goAway(5000);
        })
        .catch((err) => {
          console.error(err);
          this.$global
            .appError({ mensaje: "Error al realizar el pago" })
            .goAway(5000);
        });
    },
  },
});

// TODO: paste code from step 1.1.5
paymentForm.build();
// onGetCardNonce is triggered when the "Pay $1.00" button is clicked

export default {
  data() {
    return {
      activarModal: false,
    };
  },
  props: { monto: { required: true } },
  methods: {
    abrirModal() {
      this.activarModal = true;
    },
    cerrarModal() {
      this.activarModal = false;
    },

    onGetCardNonce(event) {
      // Don't submit the form until SqPaymentForm returns with a nonce
      event.preventDefault();
      // Request a nonce from the SqPaymentForm object
      paymentForm.requestCardNonce();
    },
  },
};
</script>
