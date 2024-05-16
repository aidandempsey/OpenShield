// material
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    color: 'var(--secondary-color)',
    textTransform: 'none',
    fontSize: '1em',
    padding: '10px',
    lineHeight: 1.5,
    backgroundColor: 'var(--dark-background-color)',
    fontFamily: [
        'Poppins',
    ].join(','),
    '&:hover': {
        backgroundColor: 'var(--dark-background-color)',
        color: 'var(--secondary-color)',
    }
});

export default function MuiActiveFilterButton(props) {
    const { text, handler, type } = props
    return (
        <BootstrapButton type={type ? type : "button"} variant="contained" disableRipple onClick={handler ? () => { handler() } : () => { }}>{text}</BootstrapButton>
    );
}
