export default function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Daily App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Personal</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Sweat</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Work</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}