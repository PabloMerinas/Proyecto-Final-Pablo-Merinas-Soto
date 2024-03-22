import React from "react";
import './style.css'


function generateOption(awesomeIco, title, description) {
    return (
        <div className="personal-info-p-rincipal-depth5-frame06">
            <div className="personal-info-p-rincipal-depth6-frame06">
                <div className="personal-info-p-rincipal-depth7-frame012">
                    <i className={awesomeIco}></i>
                </div>
            </div>
            <div className="personal-info-p-rincipal-depth6-frame16">
                <div className="personal-info-p-rincipal-depth7-frame013">
                    <div className="personal-info-p-rincipal-depth8-frame017">
                        <span className="personal-info-p-rincipal-text28">
                            <span>{title}</span>
                        </span>
                    </div>
                </div>
                <div className="personal-info-p-rincipal-depth7-frame14">
                    <div className="personal-info-p-rincipal-depth8-frame018">
                        <span className="personal-info-p-rincipal-text30">
                            <span>
                                {description}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const PersonalInfo = () => {
    const activeUser = localStorage.getItem("activeUser");
    //console.log(JSON.parse(activeUser).username);
    return (
        <div className="personal-info-p-rincipal-container">
            <div className="personal-info-p-rincipal-my-profile">
                <div className="personal-info-p-rincipal-depth3-frame0">
                    <div className="personal-info-p-rincipal-depth4-frame0">
                        <div className="personal-info-p-rincipal-depth5-frame0">
                            <div className="personal-info-p-rincipal-depth6-frame0">
                                <div className="personal-info-p-rincipal-depth7-frame0">
                                    <div className="personal-info-p-rincipal-depth8-frame0">
                                        <div className="personal-info-p-rincipal-depth9-frame0">
                                            <span className="personal-info-p-rincipal-text">
                                                <span>Profile</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="personal-info-p-rincipal-depth6-frame1">
                                <div className="personal-info-p-rincipal-depth7-frame001">
                                    <div className="personal-info-p-rincipal-depth8-frame001">
                                        <div className="personal-info-p-rincipal-depth9-frame01">
                                            <span className="personal-info-p-rincipal-text02">
                                                <span>Your profile</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="personal-info-p-rincipal-depth7-frame7">
                                    <div className="personal-info-p-rincipal-depth8-frame002">
                                        <div className="personal-info-p-rincipal-depth9-frame02">
                                            <span className="personal-info-p-rincipal-text04">
                                                <span>Delete account</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="personal-info-p-rincipal-depth3-frame1">
                    <div className="personal-info-p-rincipal-depth4-frame01">
                        <div className="personal-info-p-rincipal-depth5-frame01">
                            <div className="personal-info-p-rincipal-depth6-frame01">
                                <div className="personal-info-p-rincipal-depth7-frame002">
                                    <span className="personal-info-p-rincipal-text06">
                                        <span>Your profile</span>
                                    </span>
                                </div>
                            </div>
                            <div className="personal-info-p-rincipal-depth6-frame11">
                                <div className="personal-info-p-rincipal-depth7-frame003">
                                    <span className="personal-info-p-rincipal-text08">
                                        <span>
                                            Explore Your User Management Options: Navigate Through Your User Settings.
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame1">
                        {generateOption("fa-solid fa-envelope", `Email address || ${JSON.parse(activeUser).email}`, `You will receive notifications about your account and bookings at this email address`)}
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame2">
                        {generateOption("fa-solid fa-key", "Password", "********")}
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame3">
                        {generateOption("fa-solid fa-phone", "Phone number", "********")}
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame4">
                        {generateOption("fa-solid fa-user", "Profile photo", "Add a profile photo.")}
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame5">
                        {generateOption("fa-solid fa-info", "Bio", "Complete your profile for a better experience.")}
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame7">
                        <div className="personal-info-p-rincipal-depth5-frame07">
                            <div className="personal-info-p-rincipal-depth6-frame07">
                                <div className="personal-info-p-rincipal-depth7-frame014">
                                    <span className="personal-info-p-rincipal-text32">
                                        <span>Save</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};