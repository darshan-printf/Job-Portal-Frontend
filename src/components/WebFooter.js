import React from 'react'

export default function WebFooter() {
    return (
        <>
            {/* Main Footer */}
            <footer className="main-footer m-0">
                {/* To the right */}
                <div className="float-right d-none d-sm-inline">Anything you want</div>
                {/* Default to the left */}
                <strong>
                    Copyright © 2014-2019 <a href="https://adminlte.io">AdminLTE.io</a>.
                </strong>{" "}
                All rights reserved.
            </footer>
        </>

    )
}
