import {useRouter} from "next/router";

const Details = ({user}) => {
    const router = useRouter();
    const {id} = router.query

    return (
        <div>
            <div className="container my-5 py-5 bg-light">
                <div className="row">
                    <div className="offset-2 col-md-6">
                        <div className="card-body">
                            <h5>
                                {user.name}
                            </h5>
                            <h6>
                                {user.email}
                            </h6>
                            <p className="proile-rating"><span className="text-muted">@{user.username}</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="submit" className="btn btn-secondary" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                <div className="row">
                    <label className="offset-2 col-md-2">Address:</label>
                    <p className="col-6">
                        Street {user.address.street} ,
                        Suit {user.address.suite} ,
                        City {user.address.city} <br/>
                        {user.address.zipcode}
                    </p>
                </div>
                <div className="row">
                    <label className="offset-2 col-md-2">Phone:</label>
                    <p className="col-6">
                        {user.phone}
                    </p>
                </div>
            </div>
        </div>
    );
}

export async function getStaticPaths() {

    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()

    const paths = users.map((user) => {
        return {
            params: {id: user.id.toString()}
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {

    const res = await fetch('https://jsonplaceholder.typicode.com/users/' + context.params.id)
    const user = await res.json()

    return {
        props: {
            user,
        },
    }
}

export default Details;