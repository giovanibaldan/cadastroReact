import IconGithub from '../assets/icone-github.png';

function Footer(props) {
    return (
        <div className="link-github">
            <a href="https://github.com/giovanibaldan">
                <h6><img src={IconGithub} alt="Ícone GitHub" /> Giovani Baldan</h6>
            </a>
        </div>
    )
}

export default Footer;
