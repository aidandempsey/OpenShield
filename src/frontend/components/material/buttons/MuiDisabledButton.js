// material
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    color: 'var(--dark-background-color)',
    textTransform: 'none',
    fontSize: '1em',
    padding: '10px',
    border: '1px solid var(--primary-color)',
    lineHeight: 1.5,
    backgroundColor: 'var(--primary-color)',
    fontFamily: [
        'Poppins',
    ].join(','),
    '&:hover': {
        backgroundColor: 'var(--dark-background-color)',
        color: 'var(--primary-color)',
        boxShadow: 'none',
    },
    '&:disabled': {
        boxShadow: 'none',
        color: 'red',
        backgroundColor: 'pink',
        border: '1px solid pink'
    }
});

export default function MuiButton(props) {
    const { text } = props
    return (
        <BootstrapButton variant="contained" disabled>{text}</BootstrapButton>
    );
}
