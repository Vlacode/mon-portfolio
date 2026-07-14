// ======================================================
// CONTACT.JS
// Gestion complète du formulaire de contact
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
    initializeContactForm();
});

// ======================================================
// INITIALISATION
// ======================================================

function initializeContactForm() {

    //--------------------------------------------------
    // Vérification du formulaire
    //--------------------------------------------------

    const form = document.getElementById("contact-form");

    if (!form) return;

    //--------------------------------------------------
    // Champs du formulaire
    //--------------------------------------------------

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const countryCode = document.getElementById("country-code");
    const phone = document.getElementById("phone");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const website = document.getElementById("website");
    const messageCounter = document.getElementById("message-counter");

    //--------------------------------------------------
    // Boutons
    //--------------------------------------------------

    const submitBtn = document.getElementById("contact-submit");
    const whatsappBtn = document.getElementById("whatsapp-btn");

    //--------------------------------------------------
    // Messages
    //--------------------------------------------------

    const successMessage =
        document.getElementById("success-message");

    const errorMessage =
        document.getElementById("error-message");

    //--------------------------------------------------
    // Spinner
    //--------------------------------------------------

    const submitText =
        document.getElementById("submit-text");

    const submitSpinner =
        document.getElementById("submit-spinner");

    //--------------------------------------------------
    // Expressions régulières
    //--------------------------------------------------

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
        /^[0-9\s-]{6,20}$/;

    //--------------------------------------------------
    // Fonctions utilitaires
    //--------------------------------------------------

    function showError(field, message) {

        const error =
            document.getElementById(`${field}-error`);

        if (!error) return;

        error.textContent = message;
        error.classList.remove("hidden");

    }

    //--------------------------------------------------

    function hideError(field) {

        const error =
            document.getElementById(`${field}-error`);

        if (!error) return;

        error.textContent = "";
        error.classList.add("hidden");

    }

    //--------------------------------------------------

    function clearErrors() {

        [
            "name",
            "email",
            "phone",
            "subject",
            "message"
        ].forEach(hideError);

    }

    //--------------------------------------------------

    function clearMessages() {

        successMessage.classList.add("hidden");
        errorMessage.classList.add("hidden");

        errorMessage.textContent = "";

    }

    //--------------------------------------------------
    // Validation complète
    //--------------------------------------------------

    function validateForm() {

        // Détection des robots

        if (website.value !== "") {

            return false;

        }

        clearErrors();
        clearMessages();

        let isValid = true;

        //----------------------------------------------

        if (name.value.trim() === "") {

            showError(
                "name",
                "Veuillez renseigner votre nom."
            );

            isValid = false;

        }

        //----------------------------------------------

        if (email.value.trim() === "") {

            showError(
                "email",
                "Veuillez renseigner votre adresse e-mail."
            );

            isValid = false;

        }

        else if (!emailRegex.test(email.value.trim())) {

            showError(
                "email",
                "Adresse e-mail invalide."
            );

            isValid = false;

        }

        //----------------------------------------------

        if (!phoneRegex.test(phone.value.trim())) {

            showError(
                "phone",
                "Veuillez saisir un numéro valide."
            );

            isValid = false;

        }

        //----------------------------------------------

        if (subject.value === "") {

            showError(
                "subject",
                "Veuillez sélectionner un objet."
            );

            isValid = false;

        }

        //----------------------------------------------

        if (message.value.trim().length < 10) {

            showError(
                "message",
                "Votre message doit contenir au moins 10 caractères."
            );

            isValid = false;

        }

        return isValid;

    }

    //--------------------------------------------------
    // Validation temps réel
    //--------------------------------------------------

    name.addEventListener("blur", validateForm);

    email.addEventListener("blur", validateForm);

    phone.addEventListener("blur", validateForm);

    subject.addEventListener("change", validateForm);

    message.addEventListener("blur", validateForm);

//--------------------------------------------------
// Compteur de caractères
//--------------------------------------------------

message.addEventListener("input", () => {

    const length = message.value.length;

    messageCounter.textContent =
        `${length} / 500 caractères`;

});

    //--------------------------------------------------
    // Construction du message
    //--------------------------------------------------

function buildMessage() {

        return `Nom :
        ${name.value.trim()}

        Email :
        ${email.value.trim()}

        Téléphone :
        ${countryCode.value} ${phone.value.trim()}

        Objet :
        ${subject.options[subject.selectedIndex].text}

        Message :
        ${message.value.trim()}`;

    }

    //--------------------------------------------------
    // Gestion du bouton d'envoi
    //--------------------------------------------------

    function startLoading() {

    submitBtn.disabled = true;

    // Aspect visuel du bouton
    submitBtn.classList.add(
        "opacity-50",
        "cursor-not-allowed"
    );

    submitText.classList.add("hidden");

    submitSpinner.classList.remove("hidden");

    }

    //--------------------------------------------------

    function stopLoading() {

    submitBtn.disabled = false;

    submitBtn.classList.remove(
        "opacity-50",
        "cursor-not-allowed"
    );

    submitSpinner.classList.add("hidden");

    submitText.classList.remove("hidden");

    }

    //--------------------------------------------------
    // Envoi EmailJS
    //--------------------------------------------------

    async function sendEmail() {

        startLoading();

        try {

            await emailjs.send(

                "service_4p9mt93",          // ← Remplacer si besoin
                "template_95iq4vf",         // ← Remplacer si besoin

                {

                    name: name.value.trim(),

                    email: email.value.trim(),

                    phone:
                        `${countryCode.value} ${phone.value
                        .replace(/\s+/g,"")
                        .trim()}`,

                    subject:
                        subject.options[
                            subject.selectedIndex
                        ].text,

                    message:
                        message.value.trim()

                }

            );
            
            successMessage.classList.remove("hidden");

            // Suppression du message après 5s
            setTimeout(() => {
            
            successMessage.classList.add("hidden");

            }, 5000);

            // Réinitialisation
            form.reset();

            // Suppression des erreurs restantes
            clearErrors();

            // Nettoyage des messages
            clearMessages();

            // Réaffiche uniquement le succès
            successMessage.classList.remove("hidden");

        }

        catch (err) {

            console.error(err);

            errorMessage.textContent =
                "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.";

            errorMessage.classList.remove("hidden");

        }

        finally {

            stopLoading();

        }

    }

    //--------------------------------------------------
    // Soumission du formulaire
    //--------------------------------------------------

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (!validateForm()) return;

        await sendEmail();

    });

//--------------------------------------------------
// Bouton WhatsApp
//--------------------------------------------------

    if (whatsappBtn) {

        whatsappBtn.addEventListener("click", () => {

            const confirmation = confirm(
                "Vous allez être redirigé vers WhatsApp. Continuer ?"
            );

            if (!confirmation) return;

            if (!validateForm()) return;

            const whatsappMessage =

                    `Bonjour David,

                    ${buildMessage()}

                    Merci et à bientôt.`;

            const encodedMessage =
                encodeURIComponent(whatsappMessage);

            // Remplace ce numéro par ton numéro WhatsApp
            const phoneNumber = "2250704249870";

            window.open(

                `https://wa.me/${phoneNumber}?text=${encodedMessage}`,

                "_blank"

            );

        });

    }

} // ← Fin de initializeContactForm()