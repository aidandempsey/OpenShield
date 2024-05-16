// material
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const BootstrapButton = styled(LoadingButton)({
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
    }
});

export default function MuiLoadingButton(props) {
    const { text, handler, type } = props
    return (
        <BootstrapButton loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{text}</BootstrapButton>
    );
}
