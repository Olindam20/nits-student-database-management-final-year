import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { baseApiURL } from "../../baseUrl";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { FaPlus } from "react-icons/fa6";

import "react-datepicker/dist/react-datepicker.css";
const Attendance = () => {
  const [tab, setTab] = useState("");
  const [subject, setSubject] = useState();
  const [selected, setSelected] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [enrollmentNo, setEnrollmenNo] = useState("");
  const router = useLocation();
  console.log(selected);

  useEffect(() => {
    toast.loading("Loading Subjects");
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        console.log(response.data);
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    let dateNow = startDate;
    let year = dateNow.getFullYear();
    let month = dateNow.getMonth() + 1;
    let day = dateNow.getDate();
    console.log(year, month, day);

    toast.loading("Loading Attendance");
    axios
      .post(`${baseApiURL()}/attendance/getAttendance`, {
        employeeId: router?.state.loginid,
        code: selected,
        date: `${year}-${month}-${day}`,
      })
      .then((response) => {
        toast.dismiss();
        console.log(response.data);
        if (response.data.success) {
          //   setSubject(response.data.subject);
          console.log(response?.data);
          setAttendance(response?.data?.attendance);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  }, [selected, startDate]);


  const addAttendance = () => {
    let dateNow = startDate;
    let year = dateNow.getFullYear();
    let month = dateNow.getMonth() + 1;
    let day = dateNow.getDate();
    console.log(year, month, day);
    toast.loading("Adding Attendance");
    axios
      .post(`${baseApiURL()}/attendance/addAttendance`, {
        employeeId: router?.state.loginid,
        code: selected,
        enrollmentNo: enrollmentNo,
        date: `${year}-${month}-${day}`,
      })
      .then((response) => {
        toast.dismiss();
        console.log(response.data);
        if (response.data.success) {
          //   setSubject(response.data.subject);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  }
  return (
    <div className="w-[85%] mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title={`Attendance Manager`} />
      </div>

      <div className="flex justify-between w-full  my-6">
        <div className="bg-blue-500 w-full text-md text-white p-4 mr-2 cursor-pointer" onClick={() => setTab("showAttendance")}>
          Show Attendance
        </div>
        <div className="bg-blue-500 w-full text-md text-white p-4 ml-2 cursor-pointer" onClick={() => setTab("addAttendance")}>
          Add Attendance
        </div>
      </div>

      {tab === "showAttendance" && (
        <>
          <div className="w-full my-2">
            <label htmlFor="subject"> Subject</label>
            <select value={selected.subject} name="subject" id="subject" onChange={(e) => setSelected(e.target.value)} className="px-2 bg-blue-50 py-3 rounded-sm text-base accent-blue-700 mt-1 w-full px-4">
              <option defaultValue value="select">
                -- Select Subject --
              </option>
              {subject &&
                subject.map((item) => {
                  return (
                    <option value={item.code} key={item.name}>
                      {item.name}
                    </option>
                  );
                })}
            </select>

            <div className="border-2 my-2 p-2">
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
          </div>
          {selected !== "" && (
            <div className="w-full">
              {attendance.length > 0 &&
                attendance?.map((item, key) => (
                  <div className="border-2 p-2 text-black text-md flex justify-between items-center">
                    <div className="mx-2">
                      {item?.student?.firstName} {item?.student?.lastName}
                    </div>

                    <div className="mx-2">{item?.student?.phoneNumber}</div>
                    <div className="mx-2">{item?.student?.enrollmentNo}</div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}

      {tab === "addAttendance" && (
        <div className="w-full my-2">
          <label htmlFor="subject"> Subject</label>
          <select value={selected.subject} name="subject" id="subject" onChange={(e) => setSelected(e.target.value)} className="px-2 bg-blue-50 py-3 rounded-sm text-base accent-blue-700 mt-1 w-full px-4">
            <option defaultValue value="select">
              -- Select Subject --
            </option>
            {subject &&
              subject.map((item) => {
                return (
                  <option value={item.code} key={item.name}>
                    {item.name}
                  </option>
                );
              })}
          </select>

          <div className="flex justify-start items-center my-4">
            <input className="p-2 border-2 text-md " value={enrollmentNo} onChange={(e)=>setEnrollmenNo(e.target.value)} />
            <div className="text-2xl mx-2 cursor-pointer"  onClick={()=>{addAttendance()}}>
              <FaPlus />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
