import styles from 'styles/social.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGithub,
} from '@fortawesome/free-brands-svg-icons'

export default function Social(iconSize = 'initial') {
    return (
        <ul className={styles.list} style={{ '--icon-size': iconSize }}>
            <li>
                <a href='https://github.com/Nessie-Takka'>
                    <FontAwesomeIcon icon={faGithub} />
                    <span className='sr-only'>Github</span>
                </a>
            </li>
        </ul>
    )
}