import {Models} from "appwrite"
import { useCallback, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui"

type ComboboxProps = {
  fieldChange: string;
  options: Model.Documents;
};

const Combobox = ({ fieldChange, options }: ComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const handleSelect = useCallback(
    (selectedValue: string) => {
      setValue(selectedValue);
      setOpen(false); // Close the popover after selection
      fieldChange(selectedValue); // Send the selected value to the parent element
    },
    [fieldChange]
  );
  
  return (
    <div
      className="w-full">
      
    </div>
  );
};

export default Combobox;