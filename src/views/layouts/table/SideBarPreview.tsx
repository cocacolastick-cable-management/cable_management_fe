import {ReactNode} from "react";

type SideBarPreviewProps = {
   element?: ReactNode
}

function SideBarPreview(props: SideBarPreviewProps)
{
   const Empty = () => (
      <section className={"side-bar-preview--empty"}>
         <p className={"text-2xl font-bold text-slate-400 mb-1"}>Nothing to show</p>
         <p className={"text-slate-500"}>select something to see detail</p>
      </section>
   )

   return (
      <aside className={"side-bar-preview"}>
         {
            props.element
            ? props.element
            : <Empty/>
         }
      </aside>
   )
}

export default SideBarPreview