import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTheme } from "styled-components";

export type SelectOption = {
    value: string;
    label: string;
};

type SelectComponentProps = {
    placeholder?: string;
    items: SelectOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
};

export default function SelectComponent({
    placeholder = "Selecciona una opción",
    items,
    value,
    onValueChange,
    className,
}: SelectComponentProps) {
    const { colors } = useTheme();
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger style={{ width: "100%", backgroundColor: colors.border }}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {items.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}