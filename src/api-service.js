export class API {

    static url = "https://darky-movie-rater.herokuapp.com"
    static url_dev = "http://127.0.0.1:8000"

    static createMovie(body, token) {
        return fetch(`${API.url}/api/movies/`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mr-token']}`
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json())
    }

    static getMovies(token) {
        return fetch(`${API.url}/api/movies/`, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mr-token']}`
            }
        }).then(resp => resp.json())
    }

    static updateMovie(mov_id, body, token) {
        return fetch(`${API.url}/api/movies/${mov_id}/`, {
            method: "PUT",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mr-token']}`
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json())
    }

    static deleteMovie(mov_id, token) {
        return fetch(`${API.url}/api/movies/${mov_id}/`, {
            method: "DELETE",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mr-token']}`
            },
        })
    }

    static loginUser(body) {
        return fetch(`${API.url}/auth/`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json())
    }

    static registerUser(body) {
        return fetch(`${API.url}/api/users/`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json())
    }

}