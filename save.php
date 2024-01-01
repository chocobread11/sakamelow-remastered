<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the email from the POST data
    $email = $_POST["email"];

    // Validate the email (you may want to add more robust validation)
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Here, you can save the email to your database or perform any other necessary actions
        // For demonstration purposes, let's just echo a success message
        echo "Email saved successfully!";
    } else {
        // Invalid email format
        echo "Invalid email format";
    }
} else {
    // Invalid request method
    echo "Invalid request method";
}
?>
