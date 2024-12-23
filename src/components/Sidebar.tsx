import Image from "next/image";
import Link from "next/link";

import { DottedSeparator } from "./dotted-separator";
import {Navigation} from "./navigation";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import Projects from "./Projects";

const Sidebar = () => {
    return ( 
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/">
                <Image  src="/Todo_list.svg" alt="logo" width={160} height={160}/>
            </Link>
            <DottedSeparator className="my-4"/>
            <WorkspaceSwitcher />
            <DottedSeparator className="my-4"/>
            <Navigation/>
            <DottedSeparator className="my-4"/>
            <Projects />
        </aside>
     );
}
 
export default Sidebar;