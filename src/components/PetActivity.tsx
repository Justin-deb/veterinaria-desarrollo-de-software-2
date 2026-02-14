import type { Appointment } from "../models/Appoiment.model"

const PetActivity = ({appoiment,petName}:{appoiment:Appointment,petName:string}) => {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-zinc-800" />
                <div>
                    <p className="font-semibold">{petName} • {appoiment.service}</p>
                    <p className="text-sm text-zinc-400">
                        Realized on {appoiment.date} By {appoiment.veterinarian}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PetActivity;