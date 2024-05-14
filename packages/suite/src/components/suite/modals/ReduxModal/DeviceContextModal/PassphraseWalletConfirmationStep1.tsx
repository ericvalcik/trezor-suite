import { Rows, Card, Columns, Button, Text } from '@trezor/components';
import { HELP_CENTER_PASSPHRASE_URL } from '@trezor/urls';
import { Translation } from 'src/components/suite/Translation';
import { TrezorLink } from 'src/components/suite/TrezorLink';
import { PassphraseHeading } from './PassphraseHeading';
import { ContentType } from './types';
import { Dispatch } from 'react';

type PassphraseWalletConfirmationStep1Props = {
    setContentType: Dispatch<React.SetStateAction<ContentType>>;
    onCancel: () => void;
};

export const PassphraseWalletConfirmationStep1 = ({
    setContentType,
    onCancel,
}: PassphraseWalletConfirmationStep1Props) => (
    <>
        <PassphraseHeading>
            <Translation id="TR_PASSPHRASE_WALLET_CONFIRMATION_STEP1_TITLE" />
        </PassphraseHeading>
        <Rows gap={8}>
            <Card
                paddingType="small"
                label={
                    <Columns justifyContent="space-between">
                        <Translation id="TR_PASSPHRASE_WALLET_CONFIRMATION_STEP1_HINT" />
                        <TrezorLink type="hint" variant="nostyle" href={HELP_CENTER_PASSPHRASE_URL}>
                            <Button
                                size="tiny"
                                variant="info"
                                iconAlignment="right"
                                icon="EXTERNAL_LINK"
                            >
                                <Translation id="TR_PASSPHRASE_WALLET_CONFIRMATION_STEP1_HINT_LINK" />
                            </Button>
                        </TrezorLink>
                    </Columns>
                }
            >
                <Rows gap={12}>
                    <Text typographyStyle="highlight">
                        <Translation id="TR_PASSPHRASE_WALLET_CONFIRMATION_STEP1_OPEN_UNUSED_WALLET_DESCRIPTION" />
                    </Text>

                    <Button
                        isFullWidth
                        variant="primary"
                        onClick={() => {
                            setContentType('step2');
                        }}
                    >
                        <Translation id="TR_PASSPHRASE_WALLET_CONFIRMATION_STEP1_OPEN_UNUSED_WALLET_BUTTON" />
                    </Button>
                </Rows>
            </Card>
            <Card paddingType="small">
                <Rows gap={12}>
                    <Text typographyStyle="highlight">
                        <Translation id="TR_PASSPHRASE_WALLET_CONFIRMATION_STEP1_OPEN_WITH_FUNDS_DESCRIPTION" />
                    </Text>
                    <Button
                        isFullWidth
                        variant="tertiary"
                        onClick={() => {
                            onCancel();
                        }}
                    >
                        <Translation id="TR_PASSPHRASE_WALLET_CONFIRMATION_STEP1_OPEN_WITH_FUNDS_BUTTON" />
                    </Button>
                </Rows>
            </Card>
        </Rows>
    </>
);