import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

const CookieBanner = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cookieConsent, setCookieConsent] = useState(false);
  const [cookieSelection, setCookieSelection] = useState({
    preferences: false,
    analytics: false,
    advertising: false,
  });

  const handleAccept = () => {
    setCookieConsent(true);
    setAnchorEl(null);

    // Set the appropriate cookies based on the user's selections
    if (cookieSelection.preferences) {
      setCookie("preferencesCookie", "true", 30); // Change expirationDays as needed
    }
    if (cookieSelection.analytics) {
      setCookie("analyticsCookie", "true", 30); // Change expirationDays as needed
    }
    if (cookieSelection.advertising) {
      setCookie("advertisingCookie", "true", 30); // Change expirationDays as needed
    }

    setCookie("cookieConsent", "true", 30); // Change expirationDays as needed
  };

  const handleAcceptAllCookies = () => {
    setCookieConsent(true);
    setAnchorEl(null);
    setCookie("cookieConsent", "true", 30); // Change expirationDays as needed
    setCookie("essential", "true", 30); // Change expirationDays as needed
    setCookie("analytics", cookieSelection.analytics ? "true" : "false", 30); // Change expirationDays as needed
    setCookie(
      "preferences",
      cookieSelection.preferences ? "true" : "false",
      30
    ); // Change expirationDays as needed
  };

  const handleMarketingChange = (event) => {
    setCookieSelection((prevSelection) => ({
      ...prevSelection,
      marketing: event.target.checked,
    }));
    setCookie("marketing", event.target.checked ? "true" : "false", 30); // Change expirationDays as needed
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePreferenceChange = () => {
    setCookieSelection({
      ...cookieSelection,
      preferences: !cookieSelection.preferences,
    });
  };

  const handleAnalyticsChange = () => {
    setCookieSelection({
      ...cookieSelection,
      analytics: !cookieSelection.analytics,
    });
  };

  const handleAdvertisingChange = () => {
    setCookieSelection({
      ...cookieSelection,
      advertising: !cookieSelection.advertising,
    });
  };

  const setCookie = (cookieName, cookieValue, expirationDays) => {
    var d = new Date();
    d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (!cookieConsent && document.cookie.indexOf("cookieConsent") === -1) {
    return (
      <>
        <Button variant="outlined" onClick={handleOpen}>
          Accept cookies
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div style={{ padding: 16 }}>
            <p>This website uses cookies to improve your experience.</p>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={cookieSelection.preferences}
                  onChange={handlePreferenceChange}
                />
                Preferences cookie (remember your settings and preferences)
              </label>
            </div>
            <label>
              <input
                type="checkbox"
                checked={cookieSelection.marketing}
                onChange={handleMarketingChange}
              />
              Marketing cookie (personalized ads and content)
            </label>
            <Button variant="contained" onClick={handleAccept}>
              Accept selected cookies
            </Button>
            <Button variant="contained" onClick={handleAcceptAllCookies}>
              Accept all cookies
            </Button>
          </div>
        </Popover>
      </>
    );
  } else {
    return null; // don't show the banner if the user has already accepted
  }
};

export default CookieBanner;
