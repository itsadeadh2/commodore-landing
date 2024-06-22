import axios from 'axios';

class CommandService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://itsadeadh2.com/api', // Replace with your actual base URL
            timeout: 2000,
        })
    }
    about = () => {
        return [
            'Name: Thiago Barbosa da Silva',
            'Experience: 7+ Years',
            'Stack: NodeJS, Python, GoLang, React',
            'Additional Tools: Docker, AWS, DEVOPS',
            'Hobbies: Playing retro games',
        ]
    }

    contact = () => {
        return [
            'Linkedin: https://www.linkedin.com/in/barbosathiagodev/',
            'E-Mail: itsadeadh2@gmail.com'
        ]
    }

    projects = () => {
        return ["This functionality is still under development, please retry later."]
    }
}

export default CommandService;