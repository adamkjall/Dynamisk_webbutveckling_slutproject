import React from "react";
import { useHistory } from "react-router-dom";
import { Menu, ResponsiveContext } from "grommet";
import { User } from "grommet-icons"

interface IProps {
    logout: () => void
}

const AccountMenu = (props: IProps) => {
    const history = useHistory()
    const { logout } = props
    return (
        <ResponsiveContext.Consumer>
            {(responsive) => 
            <Menu
                icon={<User/>}
                label={(responsive === "small")
                ? "Account"
                : "Your account"
                }
                items={[
                    { label: 'Orders', onClick: () => history.push("/orders") },
                    { label: 'Settings', onClick: () => history.push("/settings") },
                    { label: 'Logout', onClick: () => logout() },
                ]}
            />}
        </ResponsiveContext.Consumer>
    )
}

export default AccountMenu