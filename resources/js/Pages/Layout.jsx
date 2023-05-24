import {Link} from "@inertiajs/react";

function Layout(props) {
    return (
        <div>
            <Link href="/signin" as="button" type="button">Logout</Link>
            <Link href="/signin" as="button" type="button">Logout</Link>
            <Link href="/signin" as="button" type="button">Logout</Link>
            <Link href="/signin" as="button" type="button">Logout</Link>
        </div>
    );
}

export default Layout;
