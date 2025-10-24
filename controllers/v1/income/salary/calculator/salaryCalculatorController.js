import SalaryModel from '../../../../../models/V1/income/salary/SalaryEntriesModel.js'

class SalaryCalculatorController {

    static async NewSalary(req, res) {
        try {
            let NewSalary = await SalaryModel.create(req.body)
            res.status(200).send({message: "Creado!", data: NewSalary})
        } catch (e) {
            console.log(e.message)
            res.status(500).send({result: false, status: 500, message: e.message, data: e})
        }
    }

    static async GetSalary(req, res) {
        try {
            let salary = await SalaryModel.find(req?.params.id ? {id: req.params.id} : {})
            res.status(200).send({message: "ok", data: salary})
        } catch (e) {
            res.status(500).send({result: false, status: 500, message: e.message, data: e})
        }
    }

    static async UpdateSalary(req, res) {
        try {
            let salary = await SalaryModel.findById(req.params.id)
            salary.set(req.body)
            await salary.save()
            res.status(200).send({message: "ok", data: salary})
        } catch (e) {
            res.status(500).send({result: false, status: 500, message: e.message, data: e})
        }
    }

    static async NewSalaryRecord(req, res) {
        try {
            const {amount, date} = req.body;
            // Validar fecha
            const inputDate = new Date(date);
            if (!date || isNaN(inputDate.getTime())) {
                return res.status(400).send({message: "Invalid date."});
            }
            const now = new Date();
            if (inputDate > now) {
                return res.status(400).send({message: "Date cannot be in the future."});
            }

            // Buscar por ID (no usar find con id suelto)
            const entry = await SalaryModel.findById(req.params.id);
            if (!entry) {
                return res.status(404).send({message: "Record not found."});
            }

            // Agregar registro
            entry.amounts.push(Number(amount));
            entry.dates.push(inputDate);
            await entry.save();
            res.status(200).send({message: "Created!", data: entry});
        } catch (e) {
            res.status(500).send({result: false, status: 500, message: e.message, data: e})
        }

    }

    static async GetAverage(req, res) {
        try {
            const docs = await SalaryModel.find();
            const result = docs.reduce((acc, doc) => {
                const avg = Number(doc.average) || 0;
                const per = String(doc.periodicity || '').toLowerCase();
                if (per === 'semanal') acc.total += avg;
                else if (per === 'mensual') acc.total += avg / 4;
                return acc;
            }, {total: 0});

            res.status(200).send({message: "Semanal", data: result.total});

        } catch (e) {
            res.status(500).send({result: false, status: 500, message: e.message, data: e})
        }
    }

}

export default SalaryCalculatorController
