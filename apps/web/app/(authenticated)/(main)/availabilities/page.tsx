export const runtime = 'edge';

import Test from '@/components/test';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Toggle } from '@founderswap/design-system/components/ui/toggle';
import { ToggleGroup } from '@founderswap/design-system/components/ui/toggle-group';

export default function AvailabilitiesPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-10px)] max-w-screen-xl flex-col gap-10 p-10 lg:flex-row">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-brand font-semibold text-3xl text-brand">
            Availabilities
          </h1>
          <p className="text-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
          </p>
        </div>
        <Test />
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row lg:items-center">
            <div className="flex w-1/5 min-w-40 flex-col gap-1 md:py-4">
              <p className="font-medium text-brand text-sm">Monday</p>
              <p className="font-semibold text-base">7 January 2025</p>
            </div>
            <ToggleGroup
              type="multiple"
              className="grid w-full grid-cols-1 items-center justify-start gap-4 md:w-4/5 md:grid-cols-2 lg:grid-cols-4"
            >
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                12:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                15:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                18:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                18:30
              </Toggle>
            </ToggleGroup>
          </div>
        </div>
        {/* <Separator /> */}
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row lg:items-center">
            <div className="flex w-1/5 min-w-40 flex-col gap-1 md:py-4">
              <p className="font-medium text-brand text-sm">Wednesday</p>
              <p className="font-semibold text-base">9 January 2025</p>
            </div>
            <ToggleGroup
              type="multiple"
              className="grid w-full grid-cols-1 items-center justify-start gap-4 md:w-4/5 md:grid-cols-2 lg:grid-cols-4"
            >
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                12:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                15:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                18:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                18:30
              </Toggle>
            </ToggleGroup>
          </div>
        </div>
        {/* <Separator /> */}
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row lg:items-center">
            <div className="flex w-1/5 min-w-40 flex-col gap-1 md:py-4">
              <p className="font-medium text-brand text-sm">Friday</p>
              <p className="font-semibold text-base">11 January 2025</p>
            </div>
            <ToggleGroup
              type="multiple"
              className="grid w-full grid-cols-1 items-center justify-start gap-4 md:w-4/5 md:grid-cols-2 lg:grid-cols-4"
            >
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                12:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                15:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                18:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                18:30
              </Toggle>
            </ToggleGroup>
          </div>
        </div>
        {/* <Separator /> */}
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row lg:items-center">
            <div className="flex w-1/5 min-w-40 flex-col gap-1 md:py-4">
              <p className="font-medium text-brand text-sm">Saturday</p>
              <p className="font-semibold text-base">12 January 2025</p>
            </div>
            <ToggleGroup
              type="multiple"
              className="grid w-full grid-cols-1 items-center justify-start gap-4 md:w-4/5 md:grid-cols-2 lg:grid-cols-4"
            >
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                12:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                15:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                18:00
              </Toggle>
              <Toggle className="h-20 w-full items-start justify-start p-4 text-left font-brand font-semibold text-base">
                18:30
              </Toggle>
            </ToggleGroup>
          </div>
        </div>
        {/* <Separator /> */}
        <div className="flex w-full">
          <Button>Send preferences</Button>
        </div>
      </div>
    </div>
  );
}
