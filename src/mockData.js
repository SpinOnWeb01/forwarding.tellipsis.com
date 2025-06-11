const dev = "https://devredirect.tellipsis.com";
const prod = "https://forwarding.tellipsis.com";
const domain = window.location.host;

export const api ={
    dev:dev,
}

export const usersGroupRolesList = [
    {
        id: 2,
        role: 'Admin',
        description: 'Admin',
        isActive: true,
        backgroundColor: 'lightblue', // Add background color for id 2
    },
    {
        id: 3,
        role: 'Reseller',
        description: 'Reseller',
        isActive: true
    },
    {
        id: 4,
        role: 'User',
        description: 'User',
        isActive: true
    }

]

