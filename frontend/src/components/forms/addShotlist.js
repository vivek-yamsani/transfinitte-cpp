import {
    Input, VStack, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
    Spinner,
    useToast,
    Avatar,
    Text,
    Box,
    HStack,
    Spacer,
    Button
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { GetAppliedStudents, ShortList,AddAnnouncement } from "../../fetchData";
import { useEffect, useRef, useState } from "react";
import { TriangleDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
function UserCard({ rollno, name, deletefn }) {
    return (
        <Box w={'100%'} padding={2} rounded='md' bg={'Background'}>
            <HStack >
                <Avatar src={`https://gravatar.com/avatar/${rollno}?d=retro`} size='xs' />
                <Text>{name}</Text>
                <Spacer />
                <DeleteIcon cursor={'pointer'} onClick={deletefn} />
            </HStack>
            <Spacer />
            <Text>{rollno}</Text>
        </Box>
    )
}

export function AddShortlist({ id, name,eligible_depts }) {
    const [students, setstudents] = useState(null);
    const [rollno, setrollno] = useState("");
    const [userdetails, setuserdetails] = useState([]);
    const [selecteduser, setselected] = useState(null);
    const toast = useToast();
    const [menuitems, setmenuitems] = useState("");
    const inputRef = useRef(null);

    function showToast(status, messege) {
        toast(
            {
                status: status,
                variant: 'left-accent',
                position: 'bottom-right',
                title: messege,
                isClosable: true,
            }
        )
    }

    const fetch = async () => {
        let res = await GetAppliedStudents(id);
        console.log("Respose", res.data);
        if (res.status == 200) {
            setstudents(res.data);
        }
    }

    const add_list = async () => {
        if (userdetails == null || userdetails.length==0) {
            showToast('error','Please select student');
            return;
        }
        var temp=userdetails.map(x=>x.id);
        let res=await ShortList(temp,id);
        if(res.status==200){
            const helper=()=>{
                let s="";
                for(var i=0;i<userdetails.length;i++){
                    s=s.concat("\n",`${userdetails[i].id}`);
                }
                return s;
            }
            var desc=`The Following students are shortlisted for interview:${'\n'}
            ${
                helper()
            }
            `
            console.log("descrip",desc);
            eligible_depts=eligible_depts.map(x=>{return {id:x.id}});
            res = await AddAnnouncement({ title: `${name} Interview shortlist`, description:desc, departments: eligible_depts })
            if(res.status==200){
                showToast('success',"Added Successfully...")
            }else{
                showToast('error',res.messege)
            }
        }else{
            showToast('error',res.messege)
        }
    }

    const menuf = (
        <Menu isOpen={rollno.length} >
            <MenuButton onClick={null} pos={'absolute'}>
            </MenuButton>
            <MenuList maxH={"150px"} maxW={'250px'} overflow={"auto"}>
                {
                    menuitems.length ?
                        menuitems.map((x) => (
                            <MenuItem onClick={() => {
                                setuserdetails([...userdetails, x]);
                                setrollno("");
                            }}>{x.id}</MenuItem>
                        )) : <MenuItem>No relevant applied members</MenuItem>
                }
            </MenuList>
        </Menu>
    )

    useEffect(() => {
        fetch();
    }, [])
    useEffect(() => {
        if (rollno != 0) {
            setmenuitems(students.filter((x) => (x.id.startsWith(rollno))))
            inputRef.current.focus();
        }
    }, [rollno])
    return (
        <>
            {students == null ? <Spinner></Spinner> :
                <VStack pos={'relative'}>
                    <Input placeholder="Enter student rollno" onChange={(e) => setrollno(e.target.value)} value={rollno} ref={inputRef} />
                    {menuf}
                    {
                        userdetails != null &&
                        userdetails.map((userdetails) =>
                            <Box width={'80%'}>
                                <UserCard rollno={userdetails.id} name={userdetails.name} deletefn={() => { console.log("deletef fnction triggerer"); }}></UserCard>
                            </Box>
                        )
                    }
                    <Button onClick={add_list} disabled={userdetails == null}>Add</Button>
                </VStack>
            }
        </>
    )
}