import styled from 'styled-components';
import { Button, Image } from '@trezor/components';
import { Translation, Modal, ModalProps } from 'src/components/suite';
import { changePin } from 'src/actions/settings/deviceSettingsActions';
import { useDispatch } from 'src/hooks/suite';

// eslint-disable-next-line local-rules/no-override-ds-component
const StyledImage = styled(Image)`
    margin: 48px auto;
`;

const StyledModal = styled(Modal)`
    width: 360px;
`;

export const PinMismatchModal = (props: ModalProps) => {
    const dispatch = useDispatch();

    const onTryAgain = () => {
        dispatch(changePin({}));
    };

    return (
        <StyledModal
            // need to pass props when cloning this inside nested modal
            {...props}
            heading={<Translation id="TR_PIN_MISMATCH_HEADING" />}
            data-testid="@pin-mismatch"
        >
            <StyledImage image="UNI_ERROR" />
            <Button onClick={onTryAgain} data-testid="@pin-mismatch/try-again-button">
                <Translation id="TR_TRY_AGAIN" />
            </Button>
        </StyledModal>
    );
};
