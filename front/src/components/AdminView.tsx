import React, { Fragment, useEffect, useState } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import * as Popover from "@radix-ui/react-popover"
import { Translate } from "react-auto-translate"
import type { HeaderTable } from "@/types/table"
import { fetchData } from "@/utils/db"
import Table from "@/components/Table"
import BackButton from "@/components/ui/BackButton"

type Props<T> = {
  promiseFetch: () => Promise<T[]>
  header: HeaderTable[]
  Rows: React.FC<{ data: T }>
  ModalPost: React.FC
}

const AdminView = <T,>({ promiseFetch, header, Rows, ModalPost }: Props<T>) => {
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    fetchData(promiseFetch(), setData)
  }, [])

  return (
    <Fragment>
      <div className="mx-auto my-4 flex w-10/12 items-center justify-between ">
        <BackButton />
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="mt-auto rounded bg-blue-500 px-2 py-1 text-center text-sm text-white transition-colors hover:bg-blue-700">
              <Translate>Ajouter une entité</Translate>
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="relative flex max-w-[350px] flex-col items-center gap-6 rounded bg-white p-4 shadow-xl">
              <Popover.Close
                className=" absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full outline-none focus:shadow-[0_0_0_2px]"
                aria-label="Close"
              >
                <Cross2Icon />
              </Popover.Close>
              <Popover.Arrow className="fill-white" />
              <ModalPost />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
      <Table header={header} Rows={Rows} dataT={data} />
    </Fragment>
  )
}

export default AdminView
