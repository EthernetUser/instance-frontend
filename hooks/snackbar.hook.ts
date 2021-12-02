import { Collapse } from "@mui/material";
import { useSnackbar, VariantType } from "notistack";
import { useCallback } from "react";

export const useSnackBarHook = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showSnack = useCallback((text: string, variant: VariantType) => {
        enqueueSnackbar(text, {
            variant,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
            TransitionComponent: Collapse
        });
    }, [enqueueSnackbar]);

    return {
        showSnack
    }
};
