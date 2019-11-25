<?php
    $toEmail = "m-mustaqeem@outlook.com.com";
    $subject = "For p2xgraphics";
    $mailHeaders = "From: " . $_POST["name"] . "<". $_POST["email"] .">\r\n";
    if(mail($toEmail, $subject , $_POST["message"], $mailHeaders)) {
        print "<p class='success'>Your message was sent successfully.</p>";
    } else {
        print "<p class='Error'>Problem in Sending Mail.</p>";
    }
?>