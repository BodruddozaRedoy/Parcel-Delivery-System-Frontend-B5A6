import ParcelAnalytics from '@/components/analytics/parcel-analytics'
import { SectionCards } from '@/components/section-cards'
import { useGetAllParcelsQuery, useGetIncomingParcelsQuery, useGetMyParcelsQuery } from '@/redux/features/parcel/parcel.api'
import { useGetProfileQuery } from '@/redux/features/auth/auth.api'



export default function DashboardPage() {
    const {data:userData} = useGetProfileQuery()
    const user = userData?.data 
    console.log(user)
    const {data:receiverData} = useGetIncomingParcelsQuery(undefined, {
        skip: user?.role !== "receiver"
    })
    const {data:adminData} = useGetAllParcelsQuery(undefined, {
        skip: user?.role !== "admin"
    })
    const {data:senderData} = useGetMyParcelsQuery(undefined, {
        skip: user?.role !== "sender"
    })

    const receiverParcel = receiverData?.data
    const adminParcel = adminData?.data
    const senderParcel = senderData?.data
    const parcels = adminParcel || senderParcel || receiverParcel || []
    // console.log("adminParcel", adminParcel)
    // console.log("receiverParcel", receiverParcel)

    return (
        <div>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards data={parcels}/>
                        <ParcelAnalytics data={parcels} />
                        {/* <DataTable data={data} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
