import React from "react";
import { useHistory } from "react-router-dom";
import { Menu, ResponsiveContext } from "grommet";
import { User, UserAdmin } from "grommet-icons"
import styled from "styled-components"

const StyledMenu = styled(Menu)`
    min-height: 3rem;
    height: 6.5vh;
    & > div {
        height: 100%;
        padding: 0 2rem 0 2rem;
    }
`

interface IProps {
    logout: () => void
    isAdmin: () => boolean
}

const AccountMenu = (props: IProps) => {
    const history = useHistory()
    const { logout, isAdmin } = props

    const menuItems = () => {
        const defaultMenu = [
            { label: 'My Orders', onClick: () => history.push("/orders") },
            { label: 'Settings', disabled: true, onClick: () => history.push("/settings") },
            { label: 'Logout', onClick: () => logout() },
        ]

        if (isAdmin()) {
            return [
                { label: 'All Orders', onClick: () => history.push("/orders-all") },
                { label: 'Edit Products', onClick: () => history.push("/admin") },
                { label: "", hoverIndicator: false, disabled: true },
                ...defaultMenu
            ]
        } else {
            return defaultMenu
        }
    }


    return (
        <ResponsiveContext.Consumer>
            {(responsive) =>
                <StyledMenu
                    dropAlign={{ "left": 'left', "top": 'bottom' }}
                    gap="small"
                    icon={(isAdmin())
                        ? <UserAdmin />
                        : <User />}
                    label={
                        (isAdmin())
                            ? "Admin"
                            : (responsive === "small")
                                ? "Account"
                                : "My account"
                    }
                    items={menuItems()}
                />}
        </ResponsiveContext.Consumer>
    )
}

export default AccountMenu