// material
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    color: 'red',
    textTransform: 'none',
    fontSize: '1em',
    padding: '10px',
    border: '1px solid pink',
    lineHeight: 1.5,
    backgroundColor: 'pink',
    fontFamily: [
        'Poppins',
    ].join(','),
    '&:hover': {
        backgroundColor: 'red',
        color: 'pink',
        boxShadow: 'none',
    }
});

export default function MuiCancelButton(props) {
    const { text, handler, type } = props
    return (
        <BootstrapButton type={type ? type : "button"} variant="contained" disableRipple onClick={handler ? () => { handler() } : () => { }}>{text}</BootstrapButton>
    );
}
