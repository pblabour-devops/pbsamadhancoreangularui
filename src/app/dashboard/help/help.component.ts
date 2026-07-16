import { Component } from '@angular/core';
import { FAQ } from '../dashboard-typed-models';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
  standalone: false
})
export class HelpComponent {

  faqs: FAQ[] = [
    {
      question: '1. What is SAMADHAN Portal?',
      answer: `SAMADHAN Portal is a digital initiative of Ministry of Labour and Employment to make the system transparent and more efficient and to make the life of workmen/union and other stakeholders smooth by giving them a single platform for raising their grievance in the form of industrial dispute, charter of demand, claims under applicable labour laws and other grievances related to employment.The purpose of Portal is also to minimise the confusion of workers under applicability of labour laws , to eliminate the delay caused due to offline communication at various levels & to facilitate the workmen/unions/stakeholders in tracking their matter online and for centralised monitoring by ministry to bring transparency and efficiency.`,
      isOpen: false
    },
    {
      question: '2. What kind of complaints can be lodged on SAMADHAN portal, and who can raise a dispute and file a claim?',
      answer: '',
      isOpen: false,
      tableRows: [
        {
          issues: 'Less payment, Non-payment of overtime, Non-payment of allowance like allowance for working at height, working in tunnel, working at hill station/ winter allowance.',
          whoCanRaise: 'Worker, Group of worker, Union, Inspector, Legal representative',
          applicableAct: 'The Minimum wages Act, 1948'
        },
        {
          issues: 'Non-payment, Unauthorized deduction, Non-payment of displacement allowance.',
          whoCanRaise: 'Worker, Group of worker, Union, Inspector, Legal representative',
          applicableAct: 'The Payment of wages Act, 1936'
        },
        {
          issues: 'Less payment and discrimination on account of gender to the female and transgender.',
          whoCanRaise: 'A claim may be made by the worker himself or herself or by any legal practitioner, by any official of a registered Trade Union authorized in writing to appear and act on his or her behalf by the worker. By any Inspector appointed under section 9 or by any other person acting with the permission of the authority.',
          applicableAct: 'The Equal remuneration Act, 1976'
        },
        {
          issues: 'Non Payment of Gratuity, Delay Payment of Gratuity, Less Payment of Gratuity',
          whoCanRaise: 'Employee, Legal heir of deceased employee/ disabled Employee., Authorized representative of employee.',
          applicableAct: 'The Payment of gratuity Act, 1972'
        },
        {
          issues: 'Non-receipt of maternity benefit. Illegal termination during the period of maternity leave.',
          whoCanRaise: 'Nominee of deceased woman employee, Legal representative of deceased woman employee, Inspector',
          applicableAct: 'The Maternity benefit Act, 1961'
        },
        {
          issues: 'Individual workman can raise dispute for illegal termination. And group of workman can raise dispute with chatter of demand, regulation of service, bonus.',
          whoCanRaise: 'Group of worker /trade union /employer can raise disputes U/s 2(k). Workman can raise dispute only in case of illegal termination U/s-2A',
          applicableAct: 'The Industrial dispute Act, 1947'
        },
        {
          issues: 'General grievances',
          whoCanRaise: 'Any other grievances not related to EPFO/ ESIC and also covered under the above mentioned Acts.',
          applicableAct: ''
        },
        {
          issues: 'For matter related to EPFO and ESIC are not dealt under this portal, Hence the workman can approach EPFO/ESIC with the provided links',
          whoCanRaise: 'ESIC- https://www.esic.in/web/esic/rti/grievances\nEPFO- https://epfigms.gov.in/Grievance/GrievanceMaster',
          applicableAct: ''
        }
      ]
    },
    {
      question: '3. Is Email ID necessary or not?',
      answer: `No, email is not mandatory. However it is suggested that one should update his/her email to get the important updates.`,
      isOpen: false
    },
    {
      question: '4. Is there any charge for lodging a complaint on SAMADHAN Portal?',
      answer: `No, There is no such charges for lodging a complaint on SAMADHAN Portal when the worker/user lodges a complaint themselves or using the Umang app.`,
      isOpen: false
    },
    {
      question: '5. What happens if there is no settlement?',
      answer: `If the industrial dispute is not settled,\n(i) FOC report in respect of Industrial dispute filed under section 2A will be forwarded by the conciliation officer to the Dy.CLC(C)/CLC(C) and the dispute may be further referred to CGIT-cum-labour court for adjudication.\n(ii) FOC report in respect of industrial dispute filed under section 2(k) will be forwarded by the conciliation officer to Ministry of Labour & Employment, and the dispute may be further referred to CGIT-cum-labour court for adjudication.`,
      isOpen: false
    },
    {
      question: '6. What, if dispute is referred to CGIT cum-labour court?',
      answer: `Labour Court gives opportunity to the parties in the matter to be heard and then it passes an award which is enforceable to both the parties.`,
      isOpen: false
    },
    {
      question: '7. What if the employer does not implement the award passed by the CGIT-cum Labour Court?',
      answer: `The matter may be brought to the notice of the Dy.CLC of the concerned region.`,
      isOpen: false
    },
    {
      question: '8. What if the party is aggrieved by the decision of the award under the Industrial Dispute Act?',
      answer: `He may seek legal remedies in the higher court.`,
      isOpen: false
    }
  ];

  toggleFAQ(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}